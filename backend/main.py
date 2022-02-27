from fastapi import FastAPI, Request, Body
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.encoders import jsonable_encoder
from typing import Optional, List
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
import pymongo
import requests
import json
import pandas as pd
from bson.objectid import ObjectId
import time
import enum
from datetime import datetime
from dateutil.relativedelta import relativedelta

from ratings import competitor_analysis, oppurtunity_rating, sectoral_analysis, relative_prosperity, ease_of_business

app = FastAPI()

BORROWER_CLIENT_URL = "https://bizfiz-lending-application.netlify.app/"

MONGODB_URL = "mongodb+srv://wecode:wecode2022@cluster0.wwgu6.mongodb.net/test?retryWrites=true&w=majority"
client = pymongo.MongoClient(MONGODB_URL)
db = client['hackathon']

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BorrowerModel(BaseModel):
    name : str
    mobileNumber : str
    typeOfBusiness : str
    businessAddress : str
    businessState : str
    businessDistrict : str
    businessPinCode : str
    amountApplied : int
    amountApproved : Optional[int] = 0
    consentId : Optional[str] = None
    sessionId : Optional[str] = None
    applicationStatus : int

class ApplicationStatus(enum.Enum):
    newApplication = 0
    accepted = 1
    halted = 2
    rejected = 3

SETU_CLIENT_ID = '6c98fc44-a91a-4fc1-affe-966a3886a4cc'
SETU_CLIENT_SECRET = 'fd437fd6-7284-4fbc-b40d-33c2b4091bdc'

def get_consent(mobileNumber, userid):
    url = "https://fiu-uat.setu.co/consents"

    currentDatetimeISO = datetime.now().isoformat()
    oneMonthAfterCurrentDatetime = datetime.now()+relativedelta(months=1)
    oneMonthAfterCurrentDatetimeISO = oneMonthAfterCurrentDatetime.isoformat()

    print(oneMonthAfterCurrentDatetimeISO)

    payload = json.dumps({
    "Detail": {
        "consentStart": currentDatetimeISO+'+05:30',
        "consentExpiry": oneMonthAfterCurrentDatetimeISO+'+05:30',
        "Customer": {
        "id": f"{mobileNumber}@onemoney"
        },
        "FIDataRange": {
        "from": "2021-01-01T00:00:00Z",
        "to": "2022-02-15T00:00:00Z"
        },
        "consentMode": "STORE",
        "consentTypes": [
        "TRANSACTIONS",
        "PROFILE",
        "SUMMARY"
        ],
        "fetchType": "PERIODIC",
        "Frequency": {
        "value": 30,
        "unit": "MONTH"
        },
        "DataLife": {
        "value": 1,
        "unit": "MONTH"
        },
        "DataConsumer": {
        "id": "setu-fiu-id"
        },
        "Purpose": {
        "Category": {
            "type": "string"
        },
        "code": "101",
        "text": "Loan underwriting",
        "refUri": "https://api.rebit.org.in/aa/purpose/101.xml"
        },
        "fiTypes": [
        "DEPOSIT"
        ]
    },
    "redirectUrl": f"{BORROWER_CLIENT_URL}/approved/{userid}"
    })
    headers = {
    'x-client-id': SETU_CLIENT_ID,
    'x-client-secret': SETU_CLIENT_SECRET,
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    print(response.json())
    return(response.json())

def create_data_session(consent_id):
    url = "https://fiu-uat.setu.co/sessions"

    payload = json.dumps({
    "consentId": consent_id,
    "DataRange": {
        "from": "2022-01-01T00:00:00.000Z",
        "to": "2022-02-15T00:00:00.000Z"
    },
    "format": "json"
    })
    headers = {
    'x-client-id': SETU_CLIENT_ID,
    'x-client-secret': SETU_CLIENT_SECRET,
    'Content-Type': 'application/json'
    }

    response = requests.request("POST", url, headers=headers, data=payload)
    sessionId = response.json()['id']
    # Hit data session api and return session id
    return sessionId

def fetch_and_save_session_data(userid, sessionid):

    url = f"https://fiu-uat.setu.co/sessions/{sessionid}"

    # print(url,"##########################")

    headers = {
    'x-client-id': SETU_CLIENT_ID,
    'x-client-secret': SETU_CLIENT_SECRET
    }

    response = requests.request("GET", url, headers=headers)
    print(response)
    session_status = response.json()['status']

    if session_status == "COMPLETED":
        # print("*"*20)
        payload = response.json()['Payload'][0]
        # print(payload['data'][0])
        account_details = payload['data'][0]['decryptedFI']['account']
        # print(account_details)
        obj = {
            'userid':userid,
            'accountDetails':account_details
        }
        result = db['financialData'].insert_one(obj)
        return {'status': session_status,'db_inserted_id' :result.inserted_id}
    
    else:
        return {'status':session_status}
    # return None

def transaction_analysis(useId):
    defaultObj = [{'name':'Online Spends','value':30},{'name':'Earns','value':50},{'name':'Cash Withdrawl', 'value':20}]
    return defaultObj

@app.get('/') # instead of app.route
def index():
	return {'msg':'API working. Check /docs for more'}

@app.post('/addborrower')
def add_borrower(borrower: BorrowerModel = Body(...)):
    # Business PIN Code is important.......take it seperately
    borrower = jsonable_encoder(borrower)
    borrower['businessState']  = borrower['businessState'].lower()
    borrower['businessDistrict']  = borrower['businessDistrict'].lower()
    result = db["borrowers"].insert_one(borrower)
    userid = result.inserted_id
    print("*"*10,userid,"*"*10)
    response = get_consent(borrower['mobileNumber'], str(userid))
    consentId = response['id']
    db["borrowers"].update_one({"_id":userid},{"$set":{"consentId":consentId}})
    return {'consentUrl':response['url']}

@app.get('/all')
def get_all_application():
    borrowers = db["borrowers"].find()
    # print("*"*20)
    # print(type(borrowers))
    # print(borrowers)
    borrowersList = []
    for borrower in borrowers:
        userId = str(borrower['_id'])
        name = borrower['name']
        mobileNumber = borrower['mobileNumber']
        applicationDate = borrower['_id'].generation_time
        applicationStatus = borrower['applicationStatus']

        obj = {
            'userId' : userId,
            'name' : name,
            'mobileNumber' : mobileNumber,
            'applicationDate' : applicationDate,
            'applicationStatus' : applicationStatus
        } 

        borrowersList.append(obj)

    return borrowersList

@app.get('/getdatasession')
def get_data_session(userid : str):
    borrower = db['borrowers'].find_one({'_id':ObjectId(userid)})
    consentId = borrower['consentId']
    time.sleep(5)
    # print("consentId fetched", consentId)
    sessionId = create_data_session(consentId)
    print(sessionId,"**********************")
    db["borrowers"].update_one({"_id":ObjectId(userid)},{"$set":{"sessionId":sessionId}})
    time.sleep(30)
    res = fetch_and_save_session_data(userid,sessionId)
    if res['status'] == "COMPLETED":
        return {"msg":"successfully fetched and saved data"}
    else:
        time.sleep(10)
        res = fetch_and_save_session_data(userid, sessionId)
    return {"msg":"successfully fetched and saved data"}

@app.get('/userinfo')
def fetch_user_info(userid : str):
    # userid = '621778c7483eddc7a6f091fc'
    borrower = db['borrowers'].find_one({'_id':ObjectId(userid)},{'_id': False, 'consentId': False, 'sessionId': False})
    # print(borrower)
    financialDetails = db['financialData'].find_one({'userid':userid})
    # print(financialDetails)
    # print("*"*20)
    accountDetails = financialDetails['accountDetails']
    # print(accountDetails)
    profileFinancialDetails = accountDetails['profile']
    # print(profileFinancialDetails)
    summaryFinancialDetails = accountDetails['summary']
    # print(summaryFinancialDetails)
    pincode = borrower['businessPinCode']
    typeOfBusiness = borrower['typeOfBusiness']
    state = borrower['businessState']
    district = borrower['businessDistrict']
    amountApplied = borrower['amountApplied']
    # print(pincode,typeOfBusiness,state,district)
    competitorAnalysis = competitor_analysis(pincode, typeOfBusiness)
    oppurtunityRating = oppurtunity_rating(state,district)
    sectoralAnalysis = sectoral_analysis(typeOfBusiness.lower())
    relativeProsperity = relative_prosperity(state,district)
    easeOfBusiness = ease_of_business(pincode, state)
    transactionAnalysis = transaction_analysis(userid)

    score = (competitorAnalysis['rating']+oppurtunityRating['rating']+sectoralAnalysis['rating']+relativeProsperity['rating']+easeOfBusiness['rating'])
    # print("*"*40)
    allowedCredit = int((score/500)*amountApplied)
    
    accountNumber = accountDetails['maskedAccNumber']
    accountType = accountDetails['type']

    try:
        holder = profileFinancialDetails['holders']['holder'][0]
        accountEmail = holder['email']
        pan = holder['pan']
    except:
        accountEmail = 'NA'
        pan = 'NA'
   


    obj = {
        'userFormSubmittedInfo':{
            'Name': borrower['name'],
            'Phone':borrower['mobileNumber'],
            'Business Type':borrower['typeOfBusiness'],
            'Business Adress': borrower['businessAddress'],
            'Amount Applied': borrower['amountApplied']
        },
        'score': score,
        'allowedCredit':allowedCredit,
        'accountDetails': {
            'Account Number':accountNumber,
            'Account Type':accountType,
            'Account Email':accountEmail,
            'PAN':pan
        },
        'indicators':[
            competitorAnalysis,
            oppurtunityRating,
            sectoralAnalysis,
            relativeProsperity,
            easeOfBusiness,
        ],
        'transactionalAnalysis':transactionAnalysis
    }
    # print(obj)

    return obj

@app.get('/updateuser')
def update_user(userid : str ,updateType : str, approvedAmount : Optional[int] = 0):
    ApplicationStatusValue = None
    if updateType == 'new':
        ApplicationStatusValue = ApplicationStatus.newApplication.value
    elif updateType == 'accept':
        ApplicationStatusValue = ApplicationStatus.accepted.value
    elif updateType == 'reject':
        ApplicationStatusValue = ApplicationStatus.rejected.value
    elif updateType == 'halt':
        ApplicationStatusValue = ApplicationStatus.halted.value
    # print("approvedAmount = ", approvedAmount)
    db["borrowers"].update_one({"_id":ObjectId(userid)},{"$set":{"applicationStatus":ApplicationStatusValue , "approvedAmount":approvedAmount}})

    return {'msg':f'Value of user Application Status updated to {ApplicationStatusValue}'}


if __name__ == '__main__':
    uvicorn.run(app,host='0.0.0.0')
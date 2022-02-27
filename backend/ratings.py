from operator import itemgetter
import pandas as pd
import requests

GEOAPIFY_API_KEY = ''

def competitor_analysis(pincode, typeOfBusiness):
    # To-Do : google and make area wise json. are(pincode) = 5, competitor in area = 3 of each segment.
    # To-Do : if possible then Google MAP search and result for any pincode

    resolve_pincode_url = f"https://api.geoapify.com/v1/geocode/autocomplete?text={pincode}&apiKey={GEOAPIFY_API_KEY}&limit=1"
    res1 = requests.get(resolve_pincode_url).json()
    feature_res1 = res1['features'][0]
    lon = feature_res1['lon']
    lat = feature_res1['lat']    

    place_api_url_to_hit = f"https://api.geoapify.com/v2/places?categories=commercial.supermarket&filter=circle:{lon},{lat},5000&bias=proximity:77.2,28.6&limit=20&apiKey={GEOAPIFY_API_KEY}"
    res2 = requests.get(place_api_url_to_hit).json()
    competitorsObj = res2['features']

    competitorList = []
    for comp in competitorsObj:
        competitorList.append(comp['name'])

    number_of_competitors = len(competitorList)

    competitor_rating = 100/number_of_competitors

    obj = {
        'name':'Competition Score',
        'rating': competitor_rating,
        'competitors' : competitorList,
        'remarks':''
    }  
    return obj

def oppurtunity_rating(state,businessDistrict):
    q4_hoverdata_for_state = pd.read_json(f"pulsedata/map/user/hover/country/india/state/{state}/2021/3.json")
    hoverdata = q4_hoverdata_for_state['data']['hoverData']
    # print(hoverdata)
    appOpenIsToRegUserRatio = []
    for district in hoverdata:
        appOpenIsToRegUserRatio.append({'district':district[:district.find('district')-1],'ratio':(hoverdata[district]['appOpens']/hoverdata[district]['registeredUsers'])})
    sorted_list = sorted(appOpenIsToRegUserRatio, key = lambda i: i['ratio'])
    # print(sorted_list)
    district_index = next((index for (index, d) in enumerate(sorted_list) if d["district"] == businessDistrict), None)
    oppurtunity_rating = 1-(district_index/len(sorted_list))
    obj ={
        'name':'Opportunity Score',
        'rating': round(oppurtunity_rating*100,2)
    }
    return obj


def sectoral_analysis(typeOfBusiness):
    #To-Do : check online if this sector is booming.
    homeUrl = 'https://www.moneycontrol.com/stocks/marketstats/sector-scan/bse/year-to-date.html'
    growthRateSectorWise = percentage_change_sector_fetcher(homeUrl) #[{'sectorName':'Electricals,'percentChange':1.63},{...}]
    Sorted_growth_wise_sector_list = sorted(growthRateSectorWise,key=itemgetter('percentChange'))

    sector_score = 0
    for sec in Sorted_growth_wise_sector_list:
        if sec['sectorName'] == typeOfBusiness:
            break
        else:
            sector_score+=1

    sector_rating = sector_score/len(growthRateSectorWise)

    top_sector_list = []
    for sec in Sorted_growth_wise_sector_list:
        top_sector_list.append(growthRateSectorWise['sectorName'])

    sector_boom_ratings = {'fashion':40,'hospitality':51,'jewellery':87,'entertainment':67,'daily-essentials':91}
    defaultObj={
        'name': 'Sectoral Score',
        "rating": sector_rating,
        "sectors":top_sector_list,
        "remark":''
    }
    return defaultObj

def relative_prosperity(state,district):

    all_district_amount_obj = pd.read_json(f'pulsedata/map/transaction/hover/country/india/state/{state}/2021/4.json')
    district_payment_amount_hoverdatalist = all_district_amount_obj['data']['hoverdatalist']
    district_wise_list = []
    for elem in district_payment_amount_hoverdatalist:
        district_wise_list.append({
            'districtName':elem['name'],
            'amount':elem['metric'][0]['amount']
        })

    sorted_by_amount_desc = sorted(district_wise_list,key=itemgetter('amount'))

    districtScore = 0
    for dist in sorted_by_amount_desc:
        if sorted_by_amount_desc['districtName'] == district:
            break
        else:
            districtScore+=1    

    properity_rating_for_district = (districtScore/len(district_payment_amount_hoverdatalist))*100
    top_3_districts = []
    for i in range(1,3):
        top_3_districts.append(sorted_by_amount_desc[i*-1]['districtName'])
    #To-Do : a) Extract pincode%1000 pincodes b) check percentile. c) scale should be in 20-90 range.
    obj = {
        'name':'Prosperity Score',
        'rating':properity_rating_for_district,
        'moreProsperousAreas': top_3_districts,
        'remark':''
    }
    return obj

def ease_of_business(pincode, state):
    #To-Do : % of merchant payment in state as compared to merchant-payment in country

    all_states_list = []
    all_state_mechant_payment_amount = []
    for elem in all_states_list:
        state_transaction_data = pd.read_json(f"pulsedata/aggregated/transaction/country/india/state/{elem}/2021/4.json")
        transactionDataList = state_transaction_data['data']['transactionData']
        for transactData in transactionDataList:
            if(transactData['name'] == 'Merchant payments'):
                all_state_mechant_payment_amount.append({
                    'stateName':elem,
                    'merchant_amount':transactData['paymentInstruments'][0]['amount']
                })
    
    all_state_merchant_per_capita = []
    population_state_wise = pd.read_json("otherdata/state-wise-population.json",typ='series')
    for item in all_state_mechant_payment_amount:
        all_state_merchant_per_capita.append({
            'stateName':item['stateName'],
            'perCapita':item['merchant_amount']/population_state_wise['stateName']
        })
    
    sorted_merchant_per_capita_list_descending = sorted(all_state_merchant_per_capita,key=itemgetter('mechant_amount'), reverse=True)


    inputState_rank = 0
    for element in sorted_merchant_per_capita_list_descending:
        if(element['stateName'] == state):
            break
        else:
            inputState_rank+=1

    ease_of_business_rating = (inputState_rank/24)*100

    top_3_states = []
    for i in range(3):
        top_3_states.append(sorted_merchant_per_capita_list_descending['stateName'])

    Obj = {
        'name':'Ease of business Score',
        'rating':ease_of_business_rating,
        'betterAreas' : top_3_states,
        'remark':''
    }
    return Obj
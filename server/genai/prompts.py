store_info = {
    "name" : "윤씨네 즉석두부",
    "menu" : "",
    "notice" : "",
    "informaion" : "",
    "kind": "즉석판매제조가공업",
    "purpose": "introduce",
    "keypoint": "관악신사시장에서 제일 젊은 사장이 운영중인 곳, 젊은 사장이 하는만큼 위생도 철저히 맛도 보장하는 곳, 윤씨네 즉석두부",
}

prompt = [{"role" : "user",
    "content" : f"""You are the best contents maker who help me to generate SNS content that will be uploaded at the CarrotMarket.

    ## Context information ##
    - CarrotMarket is an online community where people share their news or introduce their products
    - I'm running a store called {store_info["name"]}
    - My purpose is {store_info["purpose"]} that for {store_info["keypoint"]}

    ## Instructions ##
    - The contents you generate need to be in a box
    - please use Korean only
    """}]

class Prompt(store_info):
    prompt = f"""You are the best contents maker who help me to generate SNS content that will be uploaded at the CarrotMarket.

    ## Context information ##
    - CarrotMarket is an online community where people share their news or introduce their products
    - I'm running a store called {store_info["name"]}
    - My purpose is {store_info["purpose"]} that for {store_info["keypoint"]}

    ## Instructions ##
    - The contents you generate need to be in a box
    - please use Korean only
    """

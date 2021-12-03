export default function calculate_leads_category(leads, category =  "all", hack = "all" )
{ 
    if(category === "all" && hack === "all"){
        return leads
    }
    else{ 
        var list_to_return = []
        leads.forEach(element => {
            if (element.hackname !== "all" && element.category === category && element.hackname === hack){
                list_to_return.push(element)
            }
            if(element.hackname !== "all" && element.category === category){
                list_to_return.push(element)
            }
            if(element.hackname === hack && element.category === "all"){
                list_to_return.push(element)
            }
            
        });
        return list_to_return
    }


}
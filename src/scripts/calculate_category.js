export default function calculate_leads_category(leads, category =  "all" )
{ 
    if(category === "all"){
        return leads
    }
    else{ 
        var list_to_return = []
        leads.forEach(element => {
            if (element.category === category){
                list_to_return.push(element)
            }
            
        });
        return list_to_return
    }


}
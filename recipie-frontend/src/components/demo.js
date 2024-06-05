const demo=()=>{
    let str;
 
    let countOfOpeningBraces=0;
    let countOfClosingBraces =0;
  
    for(let i=0;i<str.length;i++){
        if(str.charAt(i)=="("){
            countOfOpeningBraces++;
        }
    }

    for(let i=0;i<str.length;i++){
        if(str.charAt(i)==")"){
            countOfClosingBraces++;
        }
    }
    if(countOfClosingBraces!=countOfOpeningBraces){
        return false;
    }

    for(let i=0;i<str.length;i++){

    }
    
}
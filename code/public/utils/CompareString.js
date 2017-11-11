/*
   2017-8-28 谢海龙 用于正则匹配设备编码
   content 待检测的字符串
   keywords 要检验的内容
   startNum 从字符串的第几位检验
   endNum 从字符窜的倒数第几位检验
*/

export function CompareString (content, keywords, startNum, endNum) {
  var words = []
  words.push(keywords)
  var regExp = new RegExp('.{' + startNum + '}' + '(' + words.join('|') + ').{' + endNum + '}', 'g')
  return regExp.test(content)
}
//解析 ，实时数据查询的数据格式   deviceCode：设备编码, controlType:对面的控制类别，parameterValues:设备的测量值。
 export function changeData(deviceCode,controlType,parameterValues,num){
        if(deviceCode.length === 0){
            return{
                enterDatas:[],
                outerDatas:[]
            }                 
        }
            let enter_num = [],outer_num=[],enter=[],outer=[];
            let arrEnterType = [],arrEnterValue = [],arrOuterValue=[],arrOuterType=[];
            let newEnArr = [], newOuArr=[];
            deviceCode.map((items,index)=>{
                if(CompareString(items,"ID",10,6)){
                    enter_num.push(Number(items.substring(12,14)));
                    arrEnterType.push(controlType[index]);
                    arrEnterValue.push(parameterValues[index]);
                }else{
                    outer_num.push(Number(items.substring(12,14)));
                    arrOuterType.push(controlType[index]);
                    arrOuterValue.push(parameterValues[index]);
                }
            })      
            for(let i=0;i<enter_num.length;i++){
                enter.push({
                    num:enter_num[i],
                    controlType:arrEnterType[i],
                    parameterValues:arrEnterValue[i]
                })
            }
            for(let i=0;i<outer_num.length;i++){
                outer.push({
                    num:outer_num[i],
                    controlType:arrOuterType[i],
                    parameterValues:arrOuterValue[i]
                })
            }
            let enterTypeArrs = [];
            let enterValueArrs = [];
            let outerTypeArrs =[];
            let outerValueArrs=[];
                for(let i=0;i<num;i++){
                    enterTypeArrs.push(enter[i].controlType);
                    enterValueArrs.push(enter[i].parameterValues);
                    outerTypeArrs.push(outer[i].controlType);
                    outerValueArrs.push(outer[i].parameterValues)
                }
                newEnArr.push({
                        controlType:enterTypeArrs,
                        parameterValues:enterValueArrs,
                }) 
                newOuArr.push({
                    controlType:outerTypeArrs,
                    parameterValues:outerValueArrs,
                })

                enter.map((items,index)=>{  
                    let indexs = index+1;
                    if(indexs == enter.length){
                        return
                    }
                    if(enter[index].num !== enter[indexs].num){
                        let enTypeArr = [];
                        let enValueArr = [];
                        for(let i=1;i<=num;i++){
                            let k = index+i 
                            enTypeArr.push(enter[k].controlType)
                            enValueArr.push(enter[k].parameterValues)                  
                        }
                        newEnArr.push({
                                controlType:enTypeArr,
                                parameterValues:enValueArr
                        }) 
                    }  
                })
                outer.map((items,index)=>{  
                    let indexs = index+1;
                    if(indexs == outer.length){
                        return
                    }
                    if(outer[index].num !== outer[indexs].num){
                        let ouTypeArr = [];
                        let ouValueArr = [];
                        for(let i=1;i<=num;i++){
                            let k = index+i 
                            ouTypeArr.push(outer[k].controlType)
                            ouValueArr.push(outer[k].parameterValues)                  
                        }
                        newOuArr.push({
                                controlType:ouTypeArr,
                                parameterValues:ouValueArr
                        }) 
                    }  
                })
                return {
                    enterDatas:newEnArr,
                    outerDatas:newOuArr
                }
    }
//数组去重
export function unique (arr) {
  var res = []
  　var json = {}
  　　for (var i = 0; i < arr.length; i++) {
    　　　　if (!json[arr[i]]) {
      　　　　　　res.push(arr[i])
      　　　　　　json[arr[i]] = 1
    　　　　}
  　　}
  　　return res
}

class $Type{

}
$Type.Schema=class Schema{
    constructor(message="invalid_type_error"){
        this.message=message
    }
    typeName="schema"
    // return un autre schema
    pick(pickValue){} // prendre quelque proprieté
    omit(omitValue){} //
    partial(){} // mettre optionnel tous les proprité
    deepPartial(){} // --//-- plus profond

    // relation de Schema
    and(otherType){
        if(
            !this.schema.listAnd.find(type=>type.constructor===otherType.constructor)
        )this.schema.listOr.push(otherType);
        return this
    } // (type & otherType)
    or(otherType){
        if(
            !this.schema.listOr.find(type=>type.constructor===otherType.constructor)
        )this.schema.listOr.push(otherType);
        return this
    } // (type | otherType)
    array(){
        this.schema.isArray=true
        return this
    } // [type]
    
    //option et etat
    extend(extendValue,messageError){} // must have extendValue
    readonly(messageError){
        this.schema.isReadonly=true
        return this
    } // can not change value
    optional(){
        return this.or(new $Type.TypeUndefined)
    } // (type | undefined)
    nullable(){
        return this.or(new TypeNull)
    } // (type | null)
    nullish(){
        return this.optional().nullable()
    }  // (type | null | undefined)

    // ajout de fonctionnalité
    addMethod(methodeName,callbackMethode){} // ajouter une methode au type
    convert(callbackConvert){}               //1convertir si le test echou
    refine(callbackValidator,refineParams){} //2-rafiner la verification
    transform(callbackTransform){}           //3-transforme le valeur
    
    //instancier un variable
    createSafe(value){
        if(this.validate(valueToValidate)){
            const v=this.schema.listValidators.find(v=>v.callbackValidator(valueToValidate))
            if(v){
                return {success:false,messageError:v.messageError}
            }
            const data=new this.constructor(this.messageError)
            data.value(value)
            return {success:true,value:data}
        }
        return {success:false,messageError:this.messageError.invalid_type_error}
    } 
    create(value){
        if(this.isValid(value)){
            const data=new this.constructor(this.messageError)
            data.value(value)
            return data
        }
        throw this.messageError.invalid_type_error
    }

    validate(valueToValidate){
        throw "must implement this methode 'validate' please and must return a boolean value"
    }

    //valeur 
    value(value){
        if(this.isValid(value)){
            this.schema.value=value
            return this
        }else{
            throw this.message
        }
    }
    default(valueDefault){
        if(this.isValid(valueDefault)){
            this.schema.defaultValue=value
            return this
        }else{
            throw this.messageError.invalid_type_error
        }
    }

    //validateur
    isValid(valueToValidate){
        const valid=this.validate(valueToValidate)
        if(valid.success){
            this.schema.listValidators.forEach(v=>{
                const result =v.isValid(valueToValidate)
                if(!result.success){
                    throw result.message
                }
            })
            return true
        }else{
            const v=this.schema.listOr.find(t=>t.isValid(valueToValidate))
            return v?true:false
        }
    }
    schema={

        isReadonly:false,
        isArray:false,
        listAnd:[],
        listOr:[],
        defaultValue:undefined,
        value:undefined,
        listValidators:[],
    }
}

$Type.TypeString=class TypeString extends $Type.Schema{
    constructor(){
        super()
        
        this.schema.length={
            message:"",
            value:undefined,
            success:undefined,
            isValid(){return {success:true}}
        }
        this.schema.max={
            message:"",
            value:undefined,
            success:undefined,
            isValid(){return {success:true}}
        }
        this.schema.min={
            message:"",
            value:undefined,
            success:undefined,
            isValid(){return {success:true}}
        }
        this.schema.regex={
            message:"",
            value:undefined,
            success:undefined,
            isValid(){return {success:true}}
        }
        this.schema.email={
            message:"",
            value:undefined,
            success:undefined,
            isValid(){return {success:true}}
        }
        this.schema.url={
            message:"",
            value:undefined,
            success:undefined,
            isValid(){return {success:true}}
        }
        this.schema.noEmpty={
            message:"",
            value:undefined,
            success:undefined,
            isValid(){return {success:true}}
        }
        this.schema.listValidators=[this.schema.length]
    }
    validate(valueToValidate){
        return typeof valueToValidate==='string'?{success:true}:{success:false,message:"must be a string"}
    }
    max(maxValue,messageError){}
    min(minValue,messageError){}
    length=(lengthValue,message="the length of string is not equal "+lengthValue)=>{
        this.schema.length.value=lengthValue
        this.schema.length.message=message
        this.schema.length.isValid=(value)=>{
            this.schema.length.success =value.length===lengthValue?true:false
            return this.schema.length.success?{success:true}:{success:false,message}
        };
        return this
    }
    regex(regexValue,messageError){}
    email(messageError){}
    url(messageError){}
    noEmpty(messageError){}
}


$Type.TypeNumber=class TypeNumber extends $Type.Schema{
    min(){}
    max(){}
    equal(){}
    int(){}
    positive(){}
    negative(){}
    noPositive(){}
    noNegative(){}
    multipleOf(){}
    divisibleBy(){}
}

$Type.TypeObject=class TypeObject extends $Type.Schema{
    shape(){}
    merge(mergeValue){}
    strict(){}
    catchAll(){}
    ref(keyTarget){}
    keys(keys){}
}
$Type.TypeArray =class TypeArray extends $Type.Schema{
    element(){}
    noEmpty(messageError){}
    min(minValue,messageError){}
    max(maxValue,messageError){}
    length(lengthValue,messageError){}
}
$Type.TypeFunction=class TypeFunction extends $Type.Schema{
    getParameters(){}
    getReturnType(){}
    args(...argsType){}
    returns(returnType){}
    implement(definitionFunction){}
}
$Type.TypeNaN=class TypeNaN extends $Type.Schema{}
$Type.TypeBoolean=class TypeBoolean extends $Type.Schema{}
$Type.TypeDate=class TypeDate extends $Type.Schema{}
$Type.TypeEnum=class TypeEnum extends $Type.Schema{}
$Type.TypeUndefined=class TypeUndefined extends $Type.Schema{}
$Type.TypeNull=class TypeNull extends $Type.Schema{}

class x{
    // primitive values
    static string(messageError){return new $Type.TypeString(messageError)}
    static object(objectValue,messageError){}
    static number(messageError){}
    static bigint(messageError){}
    static boolean(messageError){}
    static date(messageError){}
    
    static enum(messageError){}
    static array(elementType){}
    // empty types
    static undefined(messageError){}
    static null(messageError){}
    static void(messageError){} // accepts undefined
    
    // catch-all types
    // allows any value
    static any(messageError){}
    static unknown(messageError){}
    
    // never type
    // allows no values
    static never(messageError){}
    static optional(optionalType){}
    static nullable(messageError){}

    static union(unionType,messageError){}
    static record(recordType,messageError){}
    static intersection(typeA,typeB,messageError){}

    static function(messageError){}
    static typeof(typeA){}
}
//,k,kl
// const sh=x.string()
//         .length(5)
//         .value(55)

// console.log(sh);
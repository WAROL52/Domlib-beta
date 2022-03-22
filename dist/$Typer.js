class $Type{

}
$Type.Schema=class Schema{
    parse(value){}
    safeParse(value){}
}
$Type.MessageError=class MessageError{
    message=""
    required_error= "Name is required"
    invalid_type_error= "Name must be a string",
}
class TypeString extends $Type.Schema{
    max(maxValue,messageError){}
    min(minValue,messageError){}
    length(lengthValue,messageError){}
    regex(regexValue,messageError){}
    email(messageError){}
    url(messageError){}
    uuid(messageError){}
    nonempty(messageError){}
}

class TypeNumber extends $Type.Schema{
    inferior(){}
    superior(){}
    equal(){}
    
}
z.number().gt(5);
z.number().gte(5); // alias .min(5)
z.number().lt(5);
z.number().lte(5); // alias .max(5)

z.number().int(); // value must be an integer

z.number().positive(); //     > 0
z.number().nonnegative(); //  >= 0
z.number().negative(); //     < 0
z.number().nonpositive(); //  <= 0

z.number().multipleOf(5); // Evenly divisible by 5. Alias .step(5)
class x{
    // primitive values
    static string(stringValue,messageError){}
    static object(objectValue,messageError){}
    static number(number,messageError){}
    static bigint(bigintValue,messageError){}
    static boolean(bigintValue,messageError){}
    static date(dateValue,messageError){}
    
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
}
//,k,kl

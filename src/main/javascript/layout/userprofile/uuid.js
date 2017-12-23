const uuid = (uuid)=>{
    return (cls)=>{
        cls.uuid = uuid;
        return cls;
    };
};

export default uuid;
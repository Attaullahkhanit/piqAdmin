const refactorProfileBusinessData = (data) => {
  const operationalData = data?.timing.map((item) => {
    if (item.open.length>0 || item?.close.length>0){
    return {
      //status: item.status,
      open: item.open.split(':'),
      close: item.close.split(':'),
      //weekday: item.weekday,
    };
  }
  else{
    return {}
  }
  });
  return {
    about: data?.about,
   // address: data?.location?.address,
    location: [
      data?.location?.coordinates?.lat,
      data?.location?.coordinates?.lng,
    ],
    coverPhoto: data?.backgroundFirebaseUrl,
    //subCategories: data?.categories?.split(",") || [],
    subCategories: data?.subCategories || [],
    businessEmail: data?.email,
    businessName: data?.name,
    businessInstagram: data?.instagram,
    //businessAssets: data?.businessAssets || [],
    //status: "pending",
    businessPhone: data?.phone,
    logo: data?.profileImageFirebaseUrl,
    operationalData: data.timing ? operationalData : {},
    businessWebsite: data?.website,
    address: data?.address,
    city: data?.city,
    country: data?.country,
    state: data?.state,
    category: data?.establishmentType || "Restaurant",
    businessUserId: "",
  };
};

export default refactorProfileBusinessData;

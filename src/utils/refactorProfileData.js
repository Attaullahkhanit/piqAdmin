const refactorProfileData = (data) => {
  const operationalData = data.timing.map((item) => {
    return {
      status: item.status,
      startingTime: item.open,
      closingTime: item.close,
      weekday: item.weekday,
    };
  });
  return {
    about: data?.about,
    address: data?.location?.address,
    location: [
      data?.location?.coordinates?.lat,
      data?.location?.coordinates?.lng,
    ],
    coverPhoto: data?.backgroundFirebaseUrl,
    subCategories: data?.categories?.split(",") || [],
    businessEmail: data?.email,
    businessName: data?.name,
    businessinstagram: data?.instagram,
    businessAssets: data?.businessAssets || [],
    status: "pending",
    businessPhone: data?.phone,
    businessImageUrl: data?.profileImageFirebaseUrl,
    operationalData,
    businessWebsite: data?.website,
    subscriptionType: "",
    establishmentType: data?.establishmentType || "restaurant",
  };
};

export default refactorProfileData;

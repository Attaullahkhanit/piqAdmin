const refactorFirebaseProfileData = (mainData) => {
  const refactoredData = [];
  mainData.forEach((businessdata) => {
    var data = businessdata.Business ? businessdata.Business : businessdata;
    // const operationalData = data?.operationalData
    //   ? data?.operationalData?.map((item) => {
    //       return {
    //         status: item.status,
    //         open: item.startingTime,
    //         close: item.closingTime,
    //         weekday: item.weekday,
    //       };
    //     })
    //   : [];
    refactoredData.push({
      id: data.id,
      businessImage: data.logo,
      profileImage: data.logo,
      profileBackground: data.coverPhoto,
      type: data.establishmentType,
      title: data.businessName,
      tags: data.subCategories || [],
      subCategories: data.subCategories || [],
      category: data.category,
      added: data.createdAt,
      views: data.total_views,
      shares: data.total_shares,
      saves: data.total_saves,
      impressions: data.total_impressions,
      comments: "1,000",
      status: data.status,
      name: data.businessName,
      email: data.businessEmail,
      phone: data.businessPhone,
      website: data.businessWebsite,
      about: data.about,
      location: data.location,
      coverPhoto: data.coverPhoto,
      book: data.book,
      offering: data.offerings,
      order: data.order,
      instagram: data.businessInstagram,
      city: data.city,
      address: data.address,
      country: data.country,
      state: data.state,
      operationalData: data.operationalData,
    });
  });
  return refactoredData;
};

export default refactorFirebaseProfileData;

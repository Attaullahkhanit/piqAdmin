const refactorContentData = (data, profileData) => {
  const newData = {
    assetId: data.id,
    assetName: data.title,
    description: data.description,
    directTo: data.directTo,
    videoUrl: data.firebaseUrl || "",
    price: parseFloat(data.price),
    ownerTags: data.tags,
    duration: 0,
    creator: profileData.name,
    thumbnail: data.thumbnailFirebaseUrl,
    assetType: data.videoType,
    businessId: data.businessId,
  };
  return newData;
};
export default refactorContentData;

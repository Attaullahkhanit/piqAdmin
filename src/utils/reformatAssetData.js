export const reformatAssetData =(videoData,businessData)=>{
    return {
        assetName:videoData?.title,
        assetType:videoData?.videoType,
        creator: businessData?.businessName,
        duration: 0,
        businessId: businessData?.id,
        ownerTags: videoData?.ownerTags,
        thumbnail:videoData?.thumbnailFirebaseUrl,
        videoUrl: videoData?.firebaseUrl || "",
        price: parseFloat(videoData?.price)
    }
}
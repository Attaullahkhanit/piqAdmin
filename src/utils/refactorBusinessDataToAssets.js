export default function refactorBusinessDataToAssets(assetData, businessData) {
  const data = [];
  assetData.forEach((asset) => {
    const business = businessData.filter(
      (business) => business?.id === asset.businessId
    );
    if (business.length > 0) {
      asset.businessName = business[0]?.businessName;
      asset.businessImageUrl = business[0]?.logo;
      asset.labels = business[0]?.subCategories;
      asset.checked = false;
      data.push(asset);
    }
  });

  return data;
}

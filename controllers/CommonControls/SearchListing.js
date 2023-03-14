const Model = require("../../models/model");

async function SearchListing(data) {
  // console.log("Req body:", data.name)
  const newData = await Model.find({
    $or: [
      { name: { $regex: data.searchString, $options: "i" } },
      { description: { $regex: data.searchString, $options: "i" } },
      { property_type: { $regex: data.searchString, $options: "i" } },
      { "address.street": { $regex: data.searchString, $options: "i" } },
      { "address.country": { $regex: data.searchString, $options: "i" } },
      { "address.suburb": { $regex: data.searchString, $options: "i" } },
      { amenities: { $regex: data.searchString, $options: "i" } },
      { summary: { $regex: data.searchString, $options: "i" } },
    ],
  }).limit(1);

  return newData;
}
module.exports = SearchListing;

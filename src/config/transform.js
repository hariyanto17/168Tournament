// const transformedMatches = {};

// function transformNode(
//   node, // OriginalNode type if using TS
//   parentFirebaseId, // string | null if using TS
//   round // number if using TS
// ) {
//   // Generate a unique Firebase ID for this node.
//   // `push().key` is perfect for this, as it guarantees uniqueness and chronological order.
//   const newFirebaseId = push(ref(database, "matches")).key;

//   const transformed = {
//     title: node.title,
//     winnerName: node.name, // Will be "TBD" for most, actual player for leaf nodes
//     children: [], // This will store Firebase IDs of its children
//     parent: parentFirebaseId,
//     round: round,
//   };

//   // If the node has children, recursively transform them
//   if (node.children && node.children.length > 0) {
//     transformed.children = node.children.map((childNode) =>
//       transformNode(childNode, newFirebaseId, round + 1)
//     );
//   }

//   // Store the transformed node in our collection using its new unique ID
//   transformedMatches[newFirebaseId] = transformed;

//   return newFirebaseId;
// }

// // 5. Main Execution Function
// async function uploadBracketData() {
//   console.log("Starting data transformation and upload...");

//   // Start the recursive transformation from the root of your original JSON.
//   // The 'Champion' node is the top, so its parent is null and it's round 0.
//   const rootMatchFirebaseId = transformNode(data, null, 0);

//   // Prepare the complete data structure to upload to Firebase
//   const dataToUpload = {
//     // This node holds tournament metadata and the starting point (rootMatchId)
//     tournaments: {
//       championship2024: {
//         // You can change "championship2024" to any ID you want for your tournament
//         title: data.title, // "Champion"
//         name: "My Awesome Tournament Bracket", // A more descriptive name for your tournament
//         rootMatchId: rootMatchFirebaseId,
//         status: "initial_setup", // You can update this later (e.g., "active", "completed")
//         createdAt: new Date().toISOString(), // Timestamp for when this was uploaded
//       },
//     },
//     // This node holds all the flattened match data
//     matches: transformedMatches,
//   };

//   try {
//     await set(ref(database), dataToUpload);
//     console.log("--------------------------------------------------");
//     console.log(
//       "🎉 Bracket data successfully uploaded to Realtime Database!"
//     );
//     console.log("Root match ID for your tournament:", rootMatchFirebaseId);
//     console.log(
//       "Total matches uploaded:",
//       Object.keys(transformedMatches).length
//     );
//     console.log(
//       "You can now view this data in your Firebase Console under the 'Data' tab for Realtime Database."
//     );
//     console.log("--------------------------------------------------");
//   } catch (error) {
//     console.error("Error uploading bracket data:", error);
//   }
// }

// // uploadBracketData();

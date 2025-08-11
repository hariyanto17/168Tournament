import fs from "fs";
const path = "./src/data.json";

function addKeys(node, counters = {}) {
  if (node.title) {
    // Hilangkan spasi pada title
    const cleanTitle = node.title.replace(/\s+/g, "");
    counters[cleanTitle] = (counters[cleanTitle] || 0) + 1;
    node.key = `${cleanTitle}-${counters[cleanTitle]}`;
  }
  if (node.children && Array.isArray(node.children)) {
    // Untuk setiap level, gunakan salinan counter agar urutan tetap benar per level
    node.children.forEach((child) => addKeys(child, { ...counters }));
  }
  return node;
}

const data = JSON.parse(fs.readFileSync(path, "utf8"));
const result = addKeys(data);
fs.writeFileSync(path, JSON.stringify(result, null, 2));

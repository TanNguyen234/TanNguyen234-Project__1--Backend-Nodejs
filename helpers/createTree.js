let count = 0;//Biến toàn cục chỉ được reset khi reset server chứ load lại thì biến vẫn ko được reset
const createTree = (arr, parentId = "") => {//Recusion
    const tree = [];
    arr.forEach((item) => {
      if (item.parent_id === parentId) {
        count++;
        const newItem = item
        newItem.index = count;
        const children = createTree(arr, item.id);
        if (children.length > 0) {
          newItem.children = children;
        }
        tree.push(newItem);
      }
    });
    return tree;
}

module.exports.tree = (arr, parentId = "") => {//Recusion
    count = 0;
    const tree = createTree(arr, parentId ="");
    return tree;
}
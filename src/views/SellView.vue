<template>
  <div>
    <form>
  <label>
    商品名:
    <input type="text" name="name" required>
  </label>
  <label>
    著者名:
    <input type="text" name="author" required>
  </label>
  <label>
    商品画像:
    <input type="file" accept="image/*" name="image" required>
  </label>
  <label>
    品質評価:
    <select name="quality" required>
      <option value="5">★★★★★</option>
      <option value="4">★★★★☆</option>
      <option value="3">★★★☆☆</option>
      <option value="2">★★☆☆☆</option>
      <option value="1">★☆☆☆☆</option>
    </select>
  </label>
  <label>
    備考:
    <textarea name="remark" rows="5" cols="30"></textarea>
  </label>
  <label>
    タグ:
    <ul>
      <li><input type="checkbox" name="tags[]" value="Coverless">カバーなし</li>
      <li><input type="checkbox" name="tags[]" value="Crease">シワあり</li>
      <li><input type="checkbox" name="tags[]" value="Dirty">汚れあり</li>
      <li><input type="checkbox" name="tags[]" value="Written">書き込みあり</li>
    </ul>
  </label>
  <button type="submit">登録</button>
</form>

  </div>
</template>

<script>
import { ref } from 'firebase/firestore';
import { fireDB, addDoc } from '../main';

export default {
  name: 'SellView',
  data() {
    return {
      name: '',
      author: '',
      image: null,
      quality: null,
      remark: "",
      tags: {
        Coverless: false,
        Crease: false,
        Dirty: false,
        Written: false
      },
    };
  },
  methods: {
    async addProduct() {
      try {
        const productsRef = ref(fireDB, 'Products');
        const docRef = await addDoc(productsRef, {
          ProductName: this.name,
          ProductAuthor: this.author,
          ProductImage: this.image,
          ProductQuality: this.quality,
          Remark: this.remark,
          Tags: this.tags,
        });
        console.log("Document written with ID: ", docRef.id);
        this.name = '';
        this.author = '';
        this.image = null;
        this.quality = null;
        this.remark = '';
        this.tags = {
          Coverless: false,
          Crease: false,
          Dirty: false,
          Written: false,
        };
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
  },
};
</script>


<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

form label {
  margin: 10px 0;
}

form input[type="text"],
form input[type="file"],
form textarea {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

form select {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

form button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
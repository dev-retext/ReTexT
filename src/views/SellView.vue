<template>
  <div class="sell-flame">
    <form @submit.prevent="submitForm">
      <div class="group group-name">
        <label>
          商品名:
          <input type="text" v-model="name" required />
        </label>
      </div>
      <div class="group group-author">
        <label>
          著者名:
          <input type="text" v-model="author" required />
        </label>
      </div>
      <div class="group group-image">
        <label>
          商品画像:
          <input
            type="file"
            accept="image/*"
            @change="uploadImageFile"
            ref="imageInput"
            required
          />
        </label>
      </div>
      <div class="group group-quality">
        <label>
          品質評価:
          <select v-model="quality" required>
            <option value="5">★★★★★</option>
            <option value="4">★★★★☆</option>
            <option value="3">★★★☆☆</option>
            <option value="2">★★☆☆☆</option>
            <option value="1">★☆☆☆☆</option>
          </select>
        </label>
      </div>
      <div class="group group-remark">
        <label>
          備考:
          <textarea
            rows="5"
            cols="30"
            v-model="remark"
          ></textarea>
        </label>
      </div>
      <div class="group group-tags">
        <label>タグ:</label>
        <label>
          <input
            type="checkbox"
            v-model="tags.Coverless"
          />カバーなし
        </label>
        <label>
          <input type="checkbox" v-model="tags.Crease" />シワあり
        </label>
        <label>
          <input type="checkbox" v-model="tags.Dirty" />汚れあり
        </label>
        <label>
          <input
            type="checkbox"
            v-model="tags.Written"
          />書き込みあり
        </label>
      </div>
      <div class="submit-button">
        <button type="submit">登録</button>
      </div>
    </form>
    <div class="disp-registered-products"></div>
    <div class="disp-traded-products"></div>
  </div>
</template>

<script>
export default {
  name: "SellView",
  data() {
    return {
      // フォームから取得する商品データを一時的に確保しておく用
      name: "",
      author: "",
      image: null,
      quality: null,
      remark: "",
      tags: {
        Coverless: false,
        Crease: false,
        Dirty: false,
        Written: false,
      },
      // フォームから取得する画像データを一時的に確保しておく用
      tmpImageFile: null,
    };
  },
  methods: {
    /* 画像を取り込む */
    async uploadImageFile(event) {
      this.tmpImageFile = event.target.files[0];
      console.log("画像データの取得")
      console.log(this.tmpImageFile)
      console.log(this.tmpImageFile.name)
    },
    /* 商品を出品する */
    async submitForm() {
      try {
        // 画像をStorageに保存し, 公開URLを取得
        const ImageURL = await this.$store.dispatch("registerImage", {imageFile: this.tmpImageFile})
        console.log("返されたurl : ", ImageURL)
        // Firestoreに登録するデータを設定(入力フォームから取得)
        const newProductData = await {
          ProductName: this.name,
          ProductAuthor: this.author,
          ProductImage: ImageURL,
          ProductQuality: this.quality,
          Remark: this.remark,
          Tags: this.tags,
        };
        // Firestoreにデータを登録し, vuexストアとrealtime databaseにProductIDを記憶
        await this.$store.dispatch("addProduct", newProductData);
        // 登録完了メッセージを表示
        console.log("商品が登録されました");
        this.$store.commit("setIsLoading", false);
        // 入力フォームを初期化
        this.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
    /* 入力フォームを初期化する */
    resetForm: function () {
      this.name = "";
      this.author = "";
      this.image = null;
      this.quality = null;
      this.remark = "";
      this.tags = {
        Coverless: false,
        Crease: false,
        Dirty: false,
        Written: false,
      };
      this.$refs.imageInput.value = null;
    },
  },
  computed: {},
  // async mounted() {
  //   /* このページを開いたら商品データを取得する */
  //   console.log("ページを開くたびに実行")
  //   // await this.$store.dispatch("fetchProductsByIDs", this.$store.state.userData.RegisteredProductIDs)
  // },
};
</script>

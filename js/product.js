
const { createApp } = Vue;
const app = {
    // 資料
    data() {
        return {
            //產品暫時存放區
            productTemp : {},
            // 產品資料格式
            products: []
        }
    },
    //方法集
    methods: {
        //取得產品列表
        getProductList(){
            axios.get(`${url}/api/${path}/admin/products`)
                        .then(res => {
                            // console.log(res.data);
                            // console.log(res.data.products);
                            this.products = res.data.products;
                        })
                        .catch(error => {
                            console.log(error.response.data);
                            alert("請先登入帳號密碼喔～不要偷懶(ゝ∀･)b 感謝你！")
                            location.href = "index.html";
                        })
        },
        //取得 Token (Token 僅需設定一次)
        checkLogin(){
            // var myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)test2\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)week2HexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // console.log(token);
            axios.defaults.headers.common['Authorization'] = token;
        },
    },
    //生命週期，元件開始的時候，執行以下這段
    mounted() {
        // console.log(this); //全部都放在Proxy.target 物件裡面，因此都是同一層。
        this.checkLogin();
        this.getProductList(); //故這邊不是this.methods.getProductList()
        
    },
}
createApp(app).mount("#app")


import { defineStore } from 'pinia';
export const useOrdersStore = defineStore('orders',{
    state: ()=>{
        return {
            orders:[],
            products:[],
            new_button_status:ref(false),
            orderTotalTable:{
                'product':0,
                'freight':0,
                'other':0,
                'total':0
            }
        }
    },
    actions:{
        setOrders(orders:any){
            this.orders = orders;
        },
        setProducts(products:any){
            this.products = products;
            this.setOrderSumProductTable(products);
        },
        addProduct(product:Object){
            this.products.push(product);
            this.setOrderSumProductTable(this.products);
        },
        updateProduct(product:Object){
            const index = this.products.findIndex(item=>item.id === product.id);
            if(index > -1){
                this.products.splice(index,1,product);
            };
            this.setOrderSumProductTable(this.products);

        },
        deleteProduct(id:any){
            const index = this.products.findIndex(item=>item.id === id);
            if(index > -1){
                this.products.splice(index,1);
            };
            this.setOrderSumProductTable(this.products);

        },
        setNewButtonStatus(status:any){
            this.new_button_status = status;
        },
        setOrderSumProductTable(payload:any){
            this.orderTotalTable.product = 0;
           payload.forEach((x: { SatisFiyati: number; Miktar: number; })=>{
              this.orderTotalTable.product += (x.SatisFiyati * x.Miktar);
           });
        },
        setOrderSumFreight(freight:any){
          this.orderTotalTable.freight = freight;
        },
        setOrderSumOther(detail_1:any,detail_2:any,detail_3:any){
            this.orderTotalTable.other = (detail_1 + detail_2 + detail_3);
        }
    },
    getters:{
        getOrders(state){
            return state.orders;
        },
        getProducts(state){
            return state.products;
        },
        getNewButtonStatus(state){
            return state.new_button_status;
        },
        getOrderTotalTable(state){
            return state.orderTotalTable;
        }
    }
})
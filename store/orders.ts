import { defineStore } from 'pinia';
export const useOrdersStore = defineStore('orders',{
    state: ()=>{
        return {
            productionOrders:[],
            products:[],
            new_button_status:ref(false),
            orderTotalTable:{
                'product':0,
                'freight':0,
                'total':0,
                'detail_1':0,
                'detail_2':0
            },
            orders_cost:[]
        }
    },
    actions:{
        setProductionOrders(orders:any){
            this.productionOrders = orders;
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
            const index = this.products.findIndex(item=>item.ID === product.ID);
            if(index > -1){
                this.products.splice(index,1,product);
            };
            this.setOrderSumProductTable(this.products);

        },
        deleteProduct(id:any){
            const index = this.products.findIndex(item=>item.ID === id);
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
        setOrderSumOther_1(detail_1:any){
            this.orderTotalTable.detail_1 = detail_1;
        },
        setOrderSumOther_2(detail_2:any){
            this.orderTotalTable.detail_2 = detail_2;
        },
        setOrdersCost(list:any){
            this.orders_cost = list;
        }
    },
    getters:{
        getProductionOrders(state){
            return state.productionOrders;
        },
        getProducts(state){
            return state.products;
        },
        getNewButtonStatus(state){
            return state.new_button_status;
        },
        getOrderTotalTable(state){
            return state.orderTotalTable;
        },
        getOrdersCost(state){
            return state.orders_cost;
        }
    }
})
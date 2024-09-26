import { defineStore } from 'pinia';

export const useBgpStore = defineStore('bgp',{
    state: ()=>{
        return{
            bgp_list:ref(),
            bgp_detail_list:ref()
        }
    },
    actions:{
        setBgpList(payload:any){
            this.bgp_list = payload;
        },
        addBgpList(payload:any){
            this.bgp_list.push(payload);
        },
        updateBgpList(payload:any){
            const index = this.bgp_list.findIndex(x=>x.ID === payload.ID);
            if(index > -1){
                this.bgp_list.splice(index,1,payload);
            }
        },
        deleteBgpList(id:any){
            const index = this.bgp_list.findIndex(x=>x.ID == id);
            if(index > -1){
                this.bgp_list.splice(index,1);
            }
        },
        setBgpDetailList(payload:any){
            this.bgp_detail_list = payload;
        },
        addBgpDetailList(payload:any){
            this.bgp_detail_list.push(payload);
        },
        updateBgpDetailList(payload:any){
            const index = this.bgp_detail_list.findIndex(x=>x.ID === payload.ID);
            if(index > -1){
                this.bgp_detail_list.splice(index,1,payload);
            }
        },
        deleteBgpDetailList(id:any){
            const index = this.bgp_detail_list.findIndex(x=>x.ID == id);
            if(index > -1){
                this.bgp_detail_list.splice(index,1);
            }
        }
    },
    getters:{
        getBgpList(state){
            return state.bgp_list;
        },
        getBgpDetailList(state){
            return state.bgp_detail_list
        }
    }
});
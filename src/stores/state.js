import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStateStore = defineStore({
  id:"state",
  state:()=>{
    return{
      token : ref(localStorage.getItem('token')),
      userInfo : ref(localStorage.getItem('userInfo')),
      patient:{},
      lab:{},
      modifiedLab:{},
      adviceOnRiskThreshold:{},
      adviceOnRisk:{},
      computingAdvice:{},
      analyze:{},
      analyzeRisk:{},
    }
  },
  getters:{
    isAuth(state){
      return state.token?.length > 0
    }
  },
  actions:{
    setToken(token){
      this.token = token
    },
    setUserInfo(userInfo){
      this.userInfo = userInfo
    },
    logout(){
      this.token = ''
      this.userInfo = ''
    },
    setPatient(patient){
      this.patient = patient
    },
    setLab(lab){
      this.lab = lab
    },
    setModifiedLab(lab){
      this.modifiedLab = lab
    },
    setAdviceOnRiskThreshold(adviceOnRiskThreshold){
      this.adviceOnRiskThreshold = adviceOnRiskThreshold
    },
    setAdviceOnRisk(adviceOnRisk){
      this.adviceOnRisk = adviceOnRisk
    },
    setComputingAdvice(computingAdvice){
      this.computingAdvice = Object.assign({},computingAdvice)
    },
    setAnalyze(analyze){
      this.analyze = analyze
    },
    setAnalyzeRisk(analyzeRisk){
      this.analyzeRisk = analyzeRisk
    },
  }
})
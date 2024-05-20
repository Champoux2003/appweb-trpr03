import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavigationBar from '../NavigationBar.vue'
import {createRouter, createWebHistory} from 'vue-router'
import { createPinia, setActivePinia } from 'pinia'
import routes from '../../router/routes'
import { useAuthStore } from '@/stores/authStore'
import { beforeEach } from 'node:test'
import { useProfileStore } from '@/stores/profileStore'


const router= createRouter({  
  history: createWebHistory(),
  routes
})
const pinia = createPinia()
describe('NavigationBar', () => {
beforeEach(() => {
  setActivePinia(pinia)
})
  describe('Utilisateur non connecté', () => {
    it('Doit pouvoir aller sur la page login ', async () => {
      
      router.push('/')
      const wrapper = mount(NavigationBar, {
        global: {
          plugins: [router, pinia]
        }
      })
      const routerSpy = vi.spyOn(router, 'push')
      const linkAboutEl = wrapper.find('#login')
      await linkAboutEl.trigger('click') 
      
      expect(routerSpy).toHaveBeenCalledWith({name: 'Login'})

    })

    it('Doit pouvoir aller sur la page d\accueil', async () => {
      router.push('/')
      const wrapper = mount(NavigationBar, {
        global: {
          plugins: [router, pinia]
        }
      })
      const routerSpy = vi.spyOn(router, 'push')
      const linkAboutEl = wrapper.find('#home')
      await linkAboutEl.trigger('click') 
      
      expect(routerSpy).toHaveBeenCalledWith({name: 'Home'})
    })
  })

  describe('utilisateur connecté', () => {
    it('Affiche un bouton de déconnexion',async () => {
      router.push('/')
      await router.isReady()
      const wrapper = mount(NavigationBar, {
        global: {
          plugins: [router, pinia]
        }
      })
      const authStore = useAuthStore()
      authStore.token = 'token'
      await wrapper.vm.$nextTick()
      const logoutButton = wrapper.find('#logout')
      expect(logoutButton.exists()).toBe(true)
      expect(logoutButton.text()).toBe('Se déconnecter')

    })

    it('Doit pouvoir aller VOir les questions', async () => {
      router.push('/')
      await router.isReady()
      const wrapper = mount(NavigationBar, {
        global: {
          plugins: [router, pinia]
        }
      })
      const authStore = useAuthStore()
      authStore.token = 'token'
      await wrapper.vm.$nextTick()
      const routerSpy = vi.spyOn(router, 'push')
      const linkAboutEl = wrapper.find('#question')
      await linkAboutEl.trigger('click') 
      
      expect(routerSpy).toHaveBeenCalledWith({name: 'Question'})
  })

  it('Doit pouvoir aller sur la page de profil', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router, pinia]
      }
    })
    const authStore = useAuthStore()
    authStore.token = 'token'
    await wrapper.vm.$nextTick()
    const routerSpy = vi.spyOn(router, 'push')
    const linkAboutEl = wrapper.find('#profile')
    await linkAboutEl.trigger('click') 
    
    expect(routerSpy).toHaveBeenCalledWith({name: 'Profile'})
  })

  it('Doit pouvoir se déconnecter', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router, pinia]
      }
    })
    const authStore = useAuthStore()
    authStore.token = 'token'
    await wrapper.vm.$nextTick()
    const routerSpy = vi.spyOn(router, 'push')
    const linkAboutEl = wrapper.find('#logout')
    await linkAboutEl.trigger('click') 
    
    expect(routerSpy).toHaveBeenCalledWith({name: 'Login'})
  })

  it('Doit pouvoir aller sur la page Classe', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router, pinia]
      }
    })
    const authStore = useAuthStore()
    authStore.token = 'token'
    await wrapper.vm.$nextTick()
    const routerSpy = vi.spyOn(router, 'push')
    const linkAboutEl = wrapper.find('#classe')
    await linkAboutEl.trigger('click') 
    
    expect(routerSpy).toHaveBeenCalledWith({name: 'Classe'})
  })
/*
  it('Doit pouvoir aller sur la page Ajouter des etudiants', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router, pinia]
      },
      isTeacher: true
    })
    const authStore = useAuthStore()
    authStore.token = 'token'

    
    await wrapper.vm.$nextTick()
    const routerSpy = vi.spyOn(router, 'push')
    const linkAboutEl = wrapper.find('#register')
    await linkAboutEl.trigger('click') 
    
    expect(routerSpy).toHaveBeenCalledWith({name: 'Register'})
  })
  */
})
})
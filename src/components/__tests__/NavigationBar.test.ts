import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NavigationBar from '../NavigationBar.vue'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore'
import { beforeEach } from 'node:test'

describe('NavigationBar', () => {

  describe('utilisateur non connecté', () => {
    it('affiche un bouton de connexion', () => {
      
    })
  })

  describe('utilisateur connecté', () => {
    it('affiche un bouton de déconnexion', () => {
      
    })
  })
})
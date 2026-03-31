import { createRouter, createWebHistory } from 'vue-router'

import Home from './pages/Home.vue'
import ComputationalDesign from './pages/ComputationalDesign.vue'
import Architecture from './pages/Architecture.vue'
import DataMgmt from './pages/DataMgmt.vue'
import Experimental from './pages/Experimental.vue'
import Career from './pages/Career.vue'
import Contact from './pages/Contact.vue'
import ProjectPage from './pages/ProjectPage.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
  { path: '/', component: Home, name: 'about' },
  { path: '/computational-design', component: ComputationalDesign, name: 'computational-design' },
  { path: '/architecture', component: Architecture, name: 'architecture' },
  { path: '/data-mgmt', component: DataMgmt, name: 'data-mgmt' },
  { path: '/experimental', component: Experimental, name: 'experimental' },
  { path: '/career', component: Career, name: 'career' },
  { path: '/contact', component: Contact, name: 'contact' },
  { path: '/project/:category/:id', component: ProjectPage, name: 'project' },
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

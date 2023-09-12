import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login1/login1.module').then( m => m.Login1PageModule)

  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'dietplan',
    loadChildren: () => import('./pages/dietplan/dietplan.module').then( m => m.DietplanPageModule)
  },
  {
    path: 'test',
    loadChildren: () => import('./test/test.module').then( m => m.TestPageModule)
  },
  {
    path: 'inventory',
    loadChildren: () => import('./pages/inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./pages/complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then( m => m.SalesPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./pages/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./pages/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'addcomplaints',
    loadChildren: () => import('./pages/addcomplaints/addcomplaints.module').then( m => m.AddcomplaintsPageModule)
  },
  {
    path: 'opencomplaints',
    loadChildren: () => import('./pages/opencomplaints/opencomplaints.module').then( m => m.OpencomplaintsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'saleform',
    loadChildren: () => import('./pages/saleform/saleform.module').then( m => m.SaleformPageModule)
  },
  {
    path: 'po',
    loadChildren: () => import('./pages/po/po.module').then( m => m.PoPageModule)
  },
  {
    path: 'poinvoice',
    loadChildren: () => import('./pages/poinvoice/poinvoice.module').then( m => m.PoinvoicePageModule)
  },
  {
    path: 'closedcomplaint',
    loadChildren: () => import('./pages/closedcomplaint/closedcomplaint.module').then( m => m.ClosedcomplaintPageModule)
  },
  {
    path: 'viewcomplaint',
    loadChildren: () => import('./pages/viewcomplaint/viewcomplaint.module').then( m => m.ViewcomplaintPageModule)
  },
  {
    path: 'cart1',
    loadChildren: () => import('./pages/cart/cart1/cart1.module').then( m => m.Cart1PageModule)
  },
  {
    path: 'cartview',
    loadChildren: () => import('./pages/cart/cartview/cartview.module').then( m => m.CartviewPageModule)
  },
  {
    path: 'varientinventory',
    loadChildren: () => import('./pages/varientinventory/varientinventory.module').then( m => m.VarientinventoryPageModule)
  },
  {
    path: 'repair',
    loadChildren: () => import('./pages/replace/repair/repair.module').then( m => m.RepairPageModule)
  },
  {
    path: 'salerecord',
    loadChildren: () => import('./sales/salerecord/salerecord.module').then( m => m.SalerecordPageModule)
  },
  {
    path: 'replaceitems',
    loadChildren: () => import('./pages/replace/replaceitems/replaceitems.module').then( m => m.ReplaceitemsPageModule)
  },
  {
    path: 'viewpo',
    loadChildren: () => import('./pages/viewpo/viewpo.module').then( m => m.ViewpoPageModule)
  },
  {
    path: 'viewpobyid',
    loadChildren: () => import('./pages/viewpobyid/viewpobyid.module').then( m => m.ViewpobyidPageModule)
  },
  {
    path: 'spinner',
    loadChildren: () => import('./spinner/spinner.module').then( m => m.SpinnerPageModule)
  },
  {
    path: 'interceptor',
    loadChildren: () => import('./interceptor/interceptor.module').then( m => m.InterceptorPageModule)
  },
  {
    path: 'ad-dash',
    loadChildren: () => import('./advertisement/ad-dash/ad-dash.module').then( m => m.AdDashPageModule)
  },
  {
    path: 'requestcallback',
    loadChildren: () => import('./pages/requestcallback/requestcallback.module').then( m => m.RequestcallbackPageModule)
  },
  {
    path: 'insurance',
    loadChildren: () => import('./pages/insurance/insurance.module').then( m => m.InsurancePageModule)
  },
  {
    path: 'finance',
    loadChildren: () => import('./pages/finance/finance.module').then( m => m.FinancePageModule)
  },
  {
    path: 'login1',
    loadChildren: () => import('./login1/login1.module').then( m => m.Login1PageModule)
  },
  // {
  //   path: 'tab4',
  //   loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

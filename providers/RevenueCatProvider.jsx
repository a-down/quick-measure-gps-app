// import { createContext, useContext, useEffect, useState } from 'react';
// import Purchases, { LOG_LEVEL, PurchasesPackage } from 'react-native-purchases';
// import { CustomerInfo } from 'react-native-purchases';

// const APIKeys = {
//   apple: 'appl_pmyciWqwEhvyqdONNdqJmpItUzd'
// }

// const RevenueCatProps = {
//   purchasePackage: (pack: PurchasePackage) => Promise<void>
//   restorePurchases: () => Promise<CustomerInfo>
//   user: UseState,
//   packages: PurchagePackage[];
// }

// // export const UserState = {
// //   hasRemovedAds: boolean;
// // }

// const RevenueCatContext = createContext<RevenueCatProps | null>(null);

// export const useRevenueCat = () => {
//   return useContext(RevenueCatContext)
// }
import { useEffect, useState } from "react";

export const useWallet = (walletCredit, payableAmount) => {
  const deductedAmountFromWallet = Math.min(payableAmount, walletCredit);
  const [isUsingWallet, setIsUsingWallet] = useState(false);
  useEffect(() => {
    if (walletCredit !== 0) {
      setIsUsingWallet(true);
    }
  }, [walletCredit]);
  return {
    isUsingWallet,
    setIsUsingWallet,
    deductedAmountFromWallet,
  };
};

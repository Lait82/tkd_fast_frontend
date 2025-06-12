import React, { useEffect, useState } from "react";
import Header from "@/utility/auth/Header";
import Footer from "@/utility/auth/Footer";
import { ReusableFormProvider } from "@/utility/form/ReusableFormContext";
import { DashboardProvider } from "@/utility/dashboard/DashboardContext";
import Modal from "@/utility/modals/Modal";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="blank-page">
      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body">
            <ReusableFormProvider>
              <DashboardProvider>
                <div className="auth--wrapper">
                  <Header />
                  {children}
                  <Footer />
                  <Modal />
                </div>
              </DashboardProvider>
            </ReusableFormProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
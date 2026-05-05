
import Navbar from "../../component/Navbar"

export default function page({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
 
      <main className="lg:pl-64 pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
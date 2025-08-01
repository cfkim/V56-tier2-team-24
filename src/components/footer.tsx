export default function Footer() {
  return (
    <div className="w-full bg-[#082368] text-white">
      <div
        id="footer-content"
        className="flex flex-col h-full justify-between items-center p-10 md:p-15 lg:p-15 font-nunito text-[14px]"
      >
        <div
          id="footer-information"
          className="w-full flex flex-col md:flex-row lg:flex-row justify-between mb-14"
        >
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-1">
              <p>Viral</p>
              <p className="font-nunito-bold">Product owner</p>
            </div>
            <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <div className="flex flex-col gap-1">
                <p>Mikala</p>
                <p className="font-nunito-bold">Scrum Master</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Vartika</p>
                <p className="font-nunito-bold">UX/UI Designer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Henry</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Claire</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Omowumi</p>
                <p className="font-nunito-bold">Shadow SM</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Khushali</p>
                <p className="font-nunito-bold">UX/UI Designer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Christine</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Rel</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 items-center justify-center mt-10">
            <a href="https://github.com/chingu-voyages/V56-tier2-team-24">
              <img
                src="./public/static/images/github 1.png"
                alt="github logo"
              />
            </a>
            <p className="font-nunito-bold">Github repo</p>
          </div>
        </div>
        <hr className="border-white w-full mb-10" />
        <div id="footer-trademark">Lumo @ 2024. All rights reserved.</div>
      </div>
    </div>
  );
}

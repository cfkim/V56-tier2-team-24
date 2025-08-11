export default function Footer() {
  return (
    <div className="bg-primary relative z-20 w-full text-white">
      <div
        id="footer-content"
        className="font-nunito flex h-full flex-col items-center justify-between p-10 text-[14px] md:p-15 lg:p-15"
      >
        <div
          id="footer-information"
          className="mb-14 flex w-full flex-col justify-between md:flex-row lg:flex-row"
        >
          <div className="flex flex-row gap-10">
            <div className="flex flex-col gap-1">
              <p>Viral</p>
              <p className="font-nunito-bold">Product owner</p>
            </div>
            <div className="grid grid-flow-row grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
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

          <div className="mt-10 flex flex-col items-center justify-center gap-3">
            <a href="https://github.com/chingu-voyages/V56-tier2-team-24">
              <img
                src="/static/images/github.png"
                alt="github logo"
              />
            </a>
            <p className="font-nunito-bold">Github repo</p>
          </div>
        </div>
        <hr className="mb-10 w-full border-white" />
        <div id="footer-trademark">Lumo @ 2024. All rights reserved.</div>
      </div>
    </div>
  );
}

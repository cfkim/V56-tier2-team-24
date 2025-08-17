export default function Footer() {
  return (
    <footer className="bg-primary relative z-20 w-full flex-none text-[8px] whitespace-nowrap text-white sm:text-sm">
      <div
        id="footer-content"
        className="font-nunito flex h-full flex-col items-center justify-between p-3.5 sm:p-4 md:p-6 lg:px-8 xl:px-11"
      >
        <div
          id="footer-information"
          className="flex w-full justify-between gap-7 px-2 py-3 sm:py-4 md:py-5 lg:py-6 xl:py-7"
        >
          <div className="flex max-w-3xl justify-between gap-7 xl:w-1/2">
            <div className="flex flex-col gap-1">
              <p>Viral</p>
              <p className="font-nunito-bold">Product Owner</p>
              <div className="flex flex-col gap-1 md:hidden">
                <p>Mikala</p>
                <p className="font-nunito-bold">Scrum Master</p>
              </div>
              <div className="flex flex-col gap-1 md:hidden">
                <p>Omowumi</p>
                <p className="font-nunito-bold">Shadow SM</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <p>Vartika</p>
                <p className="font-nunito-bold">UX/UI Designer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Khushali</p>
                <p className="font-nunito-bold">UX/UI Designer</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <p>Hyun Woo</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Christine</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1">
                <p>Claire</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Rel</p>
                <p className="font-nunito-bold">Developer</p>
              </div>
            </div>
            <div className="hidden flex-col gap-1 md:flex">
              <div className="flex flex-col gap-1">
                <p>Mikala</p>
                <p className="font-nunito-bold">Scrum Master</p>
              </div>
              <div className="flex flex-col gap-1">
                <p>Omowumi</p>
                <p className="font-nunito-bold">Shadow SM</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <a href="https://github.com/chingu-voyages/V56-tier2-team-24">
              <img
                src="/static/images/github.png"
                alt="github logo"
                className="h-5 w-5 sm:h-7 sm:w-7 md:h-9 md:w-9 lg:h-11 lg:w-11 xl:h-14 xl:w-14"
              />
            </a>
            <p className="font-nunito-bold">Github repo</p>
          </div>
        </div>
        <hr className="w-full border-white" />
        <div
          id="footer-trademark"
          className="pt-3.5 sm:pt-4 md:pt-5 lg:pt-6 xl:pt-7"
        >
          © 2025 Beacon. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

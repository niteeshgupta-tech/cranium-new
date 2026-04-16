import React from "react";



export default function Card({ title, children, glass = true, className = "" }) {

  return (

    <section

      className={[

        "rounded-2xl border border-white/10",

        glass ? "bg-white/5 backdrop-blur shadow-xl shadow-white/5" : "bg-transparent",

        className,

      ].join(" ")}

    >

      {title ? (

        <header className="px-5 pt-5 pb-2">

          <h3 className="text-sm font-semibold text-slate-100/90">{title}</h3>

        </header>

      ) : null}

      {children ? <div className={title ? "px-5 pb-5" : ""}>{children}</div> : null}

    </section>

  );

}




    import React from "react"
    
    interface BlurredBgProps extends React.ObjectHTMLAttributes<HTMLObjectElement> {
        src: string | undefined
    }
    
    const BlurredBg: React.FC<BlurredBgProps> = ({
      children,
      src=''
    }) => {
      return (
        <div
            style={{
                backgroundImage:`url(${src ?? "https://picsum.photos/586/120"})`
            }} 
            className="relative w-full rounded-lg bg-cover bg-center 
                before:content-['']
                before:absolute 
                before:inset-0 
                before:backdrop-blur-sm 
                before:rounded-lg 
                before:bg-black/60"
        >{children}
    </div>
      )
    }
    
    export default BlurredBg
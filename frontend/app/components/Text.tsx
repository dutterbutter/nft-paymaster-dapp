import React from "react";

type TextProps = {
    children: string;
}

const Text = ({ children }: TextProps) => {
    return (
        <div>
            <p className="text-base text-center max-w-md">{children}</p>
        </div>
    );
};

export default Text;
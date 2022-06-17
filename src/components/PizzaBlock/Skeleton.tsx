import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton: React.FC = (props) => (
    <ContentLoader
        className={'pizza-block'}
        speed={2}
        width={280}
        height={460}
        viewBox="0 0 280 460"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="267" rx="15" ry="15" width="279" height="29"/>
        <rect x="1" y="313" rx="10" ry="10" width="278" height="88"/>
        <rect x="2" y="420" rx="7" ry="7" width="89" height="30"/>
        <rect x="128" y="413" rx="20" ry="20" width="149" height="44"/>
        <circle cx="140" cy="126" r="124"/>
    </ContentLoader>
)

export default PizzaSkeleton
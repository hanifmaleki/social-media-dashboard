const changePeriod = ' Today'
const socialMedia = {
    FACEBOOK: {
        cardClass: 'card--facebook',
        asset: 'images/icon-facebook.svg',
        alt: 'Facebook',
    },
    TWITTER: {
        cardClass: 'card--twitter',
        asset: 'images/icon-twitter.svg',
        alt: 'Twitter',
    },
    INSTAGRAM: {
        cardClass: 'card--instagram',
        asset: 'images/icon-instagram.svg',
        alt: 'Instagram',
    },
    YOUTUBE: {
        cardClass: 'card--youtube',
        asset: 'images/icon-youtube.svg',
        alt: 'Youtube',
    },
}

const change = {
    UP: {
        class: 'card_change_up',
        asset: 'images/icon-up.svg',
        alt: 'up arrow',
    },
    DOWN: {
        class: 'card_change_down',
        asset: 'images/icon-down.svg',
        alt: 'down arrow',
    }
}

rawCards = [
    {
        type: 'FACEBOOK',
        username: '@nathanf',
        count: 1987,
        change: '12',
        size: 'big',
    },
    {
        type: 'TWITTER',
        username: '@nathanf',
        count: 1044,
        change: '99 Today',
        size: 'big',
    },
    {
        type: 'INSTAGRAM',
        username: '@nathanf',
        count: 11000,
        change: '1099',
        size: 'big',
    },
    {
        type: 'YOUTUBE',
        username: '@nathanf',
        count: 8239,
        change: '-144',
        size: 'big'
    },
    // Overview - Today
]

function getBigCards() {
    return rawCards.map(card => {
        card.cardClass = 'card ' + socialMedia[card.type].cardClass
        card.icon = {
            asset: socialMedia[card.type].asset,
            alt: socialMedia[card.type].alt,
        }

        changeClass = change['UP']
        if (card.change < 0) {
            changeClass = change['DOWN']
        }

        card.change = {
            class: 'card__change ' + changeClass.class,
            icon: changeClass.asset,
            alt: changeClass.asset,
            number: Math.abs(card.change) + changePeriod
        }

        if (card.count > 10000) {
            card.count = Math.round(card.count / 1000) + 'K'
        }

        return card
    })
}

module.exports = { getBigCards }

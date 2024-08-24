const changePeriod = ' Today'
const changePercent = '%'

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

bigCards = [
    {
        type: 'FACEBOOK',
        username: '@nathanf',
        count: 1987,
        change: 12,
        size: 'big',
    },
    {
        type: 'TWITTER',
        username: '@nathanf',
        count: 1044,
        change: 99,
        size: 'big',
    },
    {
        type: 'INSTAGRAM',
        username: '@nathanf',
        count: 11000,
        change: 1099,
        size: 'big',
    },
    {
        type: 'YOUTUBE',
        username: '@nathanf',
        count: 8239,
        change: -144,
        size: 'big'
    },
    // Overview - Today
]

rawSmallCards = [
    {
        type: 'FACEBOOK',
        previewed: 'Page Views',
        count: 87,
        change: 3,
        size: 'small',
    },
    {
        type: 'FACEBOOK',
        previewed: 'Likes',
        count: 52,
        change: -2,
        size: 'small',
    },
    {
        type: 'INSTAGRAM',
        previewed: 'Likes',
        count: 5462,
        change: 2257,
        size: 'small',
    },
    {
        type: 'INSTAGRAM',
        previewed: 'Likes',
        count: 52123,
        change: 1375,
        size: 'small',
    },
    {
        type: 'TWITTER',
        previewed: 'Retweets',
        count: 117,
        change: 303,
        size: 'small',
    },
    {
        type: 'TWITTER',
        previewed: 'Likes',
        count: 507,
        change: 553,
        size: 'small',
    },
    {
        type: 'YOUTUBE',
        previewed: 'Likes',
        count: 107,
        change: -19,
        size: 'small',
    },
    {
        type: 'YOUTUBE',
        previewed: 'Total Views',
        count: 1407,
        change: -12,
        size: 'small',
    },
]

function getBigCards() {
    return bigCards.map(card => {
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

function getSmallCards() {
    return rawSmallCards.map(card => {
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
            number: Math.abs(card.change) + changePercent
        }

        if (card.count > 10000) {
            card.count = Math.round(card.count / 1000) + 'K'
        }

        return card
    }) 
}

module.exports = { getBigCards, getSmallCards }

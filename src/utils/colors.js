import colors from 'colors'

const chalk = {
    success: (msg) => console.log(colors.green(msg)),
    error: (msg) => console.log(colors.red(msg)),
    warning: (msg) => console.log(colors.yellow(msg)),
    info: (msg) => console.log(colors.cyan(msg)),
}

export default chalk
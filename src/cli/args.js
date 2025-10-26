const parseArgs = () => {
    const args = process.argv.slice(2);
    const result = [];
    let i = 0;

    while (i < args.length) {
        const propName = args[i].replace('--', '');
        const value = args[i + 1];
        result.push(`${propName} is ${value}`);
        i += 2;
    }

    console.log(result.join(', '));
};

parseArgs();

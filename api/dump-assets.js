export default async function main(request, response) {
    const userId = request.query.UserId;
    
    const endpoints = [];
    const keys = [];
    for (const [key, value] of Object.entries(request.query)) {
        if (key === "UserId") continue;
        endpoints.push(`https://inventory.roblox.com/v1/users/${userId}/inventory/${value}`);
        keys.push(key);
    }

    const payload = (await Promise.all(
        endpoints.map(url => fetch(url).then(res => res.json()).catch(() => undefined))
    ));
    const data = {};
    payload.forEach(function(value, index) {
        data[keys[index]] = value?.data ?? undefined;
    })
    response.status(200).json(data);
}

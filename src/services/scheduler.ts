// Suitable for cron, GitHub Actions, Render cron, Railway cron or a local scheduler. The HTTP endpoint is protected by CRON_SECRET.
export function authorizedCron(req:Request){const expected=process.env.CRON_SECRET;if(!expected)return process.env.NODE_ENV!=='production';return req.headers.get('authorization')===`Bearer ${expected}`}

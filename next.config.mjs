/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers (){
        return [
            {
                source: '/(.*)',
                headers:[
                    {
                        key: 'referrer-policy',
                        value: 'no-referrer'
                    }
                    
                ]
            }
        ]
    }
};

export default nextConfig;

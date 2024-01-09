export default function EmojiGenerator() {
    return (
        <div>
            <div className='w-full flex items-center justify-center'>
                <div className='flex items-center gap-2'>
                    <span>number of emojis</span>
                    <input type='number' className='w-16' />
                </div>
            </div>
        </div>
    )
}

'use client';

import { motion, AnimatePresence } from 'motion/react';
import {
  PlayIcon,
  PauseIcon,
  ShuffleIcon,
  SkipBackIcon,
  SkipForwardIcon,
  RepeatIcon,
  Volume2Icon,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Type untuk state player
type PlayerStatus = 'playing' | 'paused' | 'loading';

export function MusicPlayer() {
  // Implementasi state management
  const [status, setStatus] = useState<PlayerStatus>('paused');

  // Handler untuk play/pause dengan simulasi loading 500ms
  const handlePlayPause = () => {
    if (status === 'playing') {
      setStatus('loading');
      setTimeout(() => setStatus('paused'), 500);
    } else if (status === 'paused') {
      setStatus('loading');
      setTimeout(() => setStatus('playing'), 500);
    }
  };

  // --- VARIANTS ANIMASI ---

  // 1. Container Animations (Background & Shadow)
  const containerVariants = {
    playing: {
      backgroundColor: '#1a1a1a',
      boxShadow: '0 0 40px rgba(139, 92, 246, 0.3)', // Purple glow
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    paused: {
      backgroundColor: '#0f0f0f',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    loading: {
      backgroundColor: '#0f0f0f',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  // 2. Album Artwork Animations (Rotation & Scale)
  const albumArtVariants = {
    playing: {
      scale: 1,
      rotate: 360,
      transition: {
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        // Rotasi infinite loop (20 detik)
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
      },
    },
    paused: {
      scale: 0.95,
      rotate: 0,
      transition: {
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        rotate: { duration: 0.3, ease: 'easeOut' },
      },
    },
    loading: {
      scale: 0.9,
      rotate: 0,
      opacity: 0.5,
      transition: {
        scale: { type: 'spring', stiffness: 300, damping: 20 },
        rotate: {
          type: 'spring',
          stiffness: 300, // Mengatur kecepatan kembali
          damping: 15, // Damping rendah = lebih memantul (bouncy)
          restDelta: 0.001,
        },
      },
    },
  };

  // 3. Equalizer Bars Animations
  // Asumsi: h-16 (Tailwind) adalah max height (~32px). 50% adalah ~6px.
  const MAX_HEIGHT = 32; // px
  const MIN_HEIGHT = 16; // px
  const PAUSED_HEIGHT = 6; // px

  const equalizerVariants = {
    playing: (i: number) => ({
      // Mengubah height absolut menjadi rasio scale (0.0 - 1.0)
      // 16px / 32px = 0.5
      // 32px / 32px = 1
      scaleY: [MIN_HEIGHT / MAX_HEIGHT, 1],
      opacity: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse' as const,
        ease: 'easeInOut',
        delay: i * 0.1,
      },
    }),
    paused: {
      scaleY: PAUSED_HEIGHT / MAX_HEIGHT, // 6px / 32px = 0.1875
      opacity: 1,
      transition: { duration: 0.3 },
    },
    loading: {
      scaleY: MIN_HEIGHT / MAX_HEIGHT, // 0.5
      opacity: 0.5,
      transition: { duration: 0.3 },
    },
  };

  // 4. Progress Bar Animation
  const progressBarVariants = {
    playing: {
      scaleX: 0.6,
      backgroundColor: '#8B5CF6',
      transition: { duration: 0.3 },
    },
    paused: {
      scaleX: 0.3875,
      backgroundColor: '#717680',
      transition: { duration: 0.3 },
    },
    loading: {
      scaleX: 0.3875,
      backgroundColor: '#525252',
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className='flex w-full items-center justify-center'>
      {/* Music player container */}
      <motion.div
        variants={containerVariants}
        initial='paused'
        animate={status}
        className='p-xl gap-2xl flex w-125 flex-col rounded-2xl bg-[#0F0F0F] text-white'
      >
        {/* Song title and author */}
        <div className='gap-xl flex flex-col'>
          <div className='gap-3xl flex items-center'>
            {/* Album Artwork Container */}
            <motion.div
              className='flex overflow-hidden rounded-xl bg-linear-to-br from-[#7C3AED] to-[#DB2777] p-36'
              variants={albumArtVariants}
            >
              <Image
                src={'/album-art.png'}
                alt='Album Art'
                width={48}
                height={60}
              />
            </motion.div>

            <div className='flex flex-col gap-8'>
              <p className='text-body-lg-semibold'>Awesome Song Title</p>
              <p className='text-body-sm text-neutral-400'>Amazing Artist</p>
            </div>
          </div>
        </div>

        {/* Audio visualizer */}
        <div className='bottom-0 ml-[144px] flex h-6 items-end gap-4'>
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              custom={index} // Mengirim index untuk stagger
              variants={equalizerVariants}
              className='bg-primary-200 w-8 origin-bottom'
              style={{
                height: MAX_HEIGHT,
                transform: `scaleY(${PAUSED_HEIGHT / MAX_HEIGHT})`,
              }}
            />
          ))}
        </div>

        {/* Song progress bar */}
        <div className='flex h-8 w-full overflow-hidden rounded-full bg-neutral-800'>
          <motion.div
            variants={progressBarVariants}
            className='flex h-full w-full origin-left'
          ></motion.div>
        </div>

        {/* Song length with time elapsed */}
        <div className='flex justify-between text-xs text-neutral-500'>
          <div>1:23</div>
          <div>3:45</div>
        </div>

        {/* Music player buttons */}
        <div className='flex items-center justify-center gap-16'>
          {/* Secondary Buttons (Shuffle, Skip, Repeat) */}
          <motion.button
            whileHover={{ color: '#ffffff', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='text-neutral-400'
          >
            <ShuffleIcon className='h-2xl m-8 w-2xl' />
          </motion.button>

          <motion.button
            whileHover={{ color: '#ffffff', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='text-neutral-400'
          >
            <SkipBackIcon className='h-2xl m-8 w-2xl' />
          </motion.button>

          {/* Main Play/Pause Button */}
          <motion.button
            onClick={handlePlayPause}
            disabled={status === 'loading'}
            whileHover={status !== 'loading' ? { scale: 1.05 } : {}}
            whileTap={status !== 'loading' ? { scale: 0.95 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            animate={{
              backgroundColor: status === 'loading' ? '#717680' : '#8B5CF6',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
            className='flex items-center justify-center rounded-full p-16'
          >
            <AnimatePresence mode='wait'>
              {status === 'loading' ? (
                <motion.div
                  key='loading'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
                  }}
                >
                  <Loader2 className='h-3xl w-3xl text-neutral-300' />
                </motion.div>
              ) : status === 'playing' ? (
                <motion.div
                  key='pause'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <PauseIcon className='h-3xl w-3xl text-white' />
                </motion.div>
              ) : (
                <motion.div
                  key='play'
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <PlayIcon className='h-3xl w-3xl text-white' />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <motion.button
            whileHover={{ color: '#ffffff', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='text-neutral-400'
          >
            <SkipForwardIcon className='h-2xl m-8 w-2xl' />
          </motion.button>

          <motion.button
            whileHover={{ color: '#ffffff', scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className='text-neutral-400'
          >
            <RepeatIcon className='h-2xl m-8 w-2xl' />
          </motion.button>
        </div>

        {/* Volume control slider */}
        <div className='group flex cursor-pointer items-center gap-8'>
          <Volume2Icon className='h-16 w-16 text-neutral-400' />
          <div className='flex h-4 w-full overflow-hidden rounded-full bg-neutral-800'>
            <motion.div
              className='flex h-full w-76.75 rounded-l-full bg-neutral-500'
              // Animasi warna saat hover pada container volume
              whileHover={{ backgroundColor: '#8B5CF6' }}
              transition={{ duration: 0.2 }}
            ></motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

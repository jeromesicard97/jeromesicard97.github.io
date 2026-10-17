import {useCallback, useMemo, useRef, useState} from 'react'
import {ArrayOfObjectsInputProps, insert, PatchEvent, set, setIfMissing, unset} from 'sanity'
import {Box, Button, Card, Flex, Stack, Text} from '@sanity/ui'
import {AddIcon} from '@sanity/icons'

type NavLink = {
  _key: string
  _type?: string
  key?: string
  number?: number
  label?: string
  x?: number
  y?: number
  position?: string
  initiallyVisible?: boolean
  action?: string
}

const LEGACY_CENTERS: Record<string, {x: number; y: number}> = {
  topLeft: {x: 17, y: 19},
  middleLeft: {x: 27, y: 43},
  bottomLeft: {x: 15, y: 83},
  middleTop: {x: 36.5, y: 27},
  middle: {x: 50, y: 50},
  middleBottom: {x: 39, y: 59},
  leftTopRight: {x: 69, y: 17},
  rightTopRight: {x: 90.5, y: 30},
  middleRight: {x: 82, y: 55.5},
  leftBottomRight: {x: 71, y: 69.5},
  rightBottomRight: {x: 87, y: 86},
}

function coordsFor(link: NavLink) {
  if (typeof link.x === 'number' && typeof link.y === 'number') {
    return {x: link.x, y: link.y}
  }
  if (link.position && LEGACY_CENTERS[link.position]) {
    return LEGACY_CENTERS[link.position]
  }
  return {x: 50, y: 50}
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function IndexMapInput(props: ArrayOfObjectsInputProps) {
  const {value = [], onChange, renderDefault} = props
  const links = value as NavLink[]
  const boardRef = useRef<HTMLDivElement | null>(null)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const dragRef = useRef<{key: string} | null>(null)

  const nextNumber = useMemo(() => {
    const nums = links.map((l) => l.number || 0)
    return (nums.length ? Math.max(...nums) : 0) + 1
  }, [links])

  const patchLink = useCallback(
    (key: string, patch: Partial<NavLink>) => {
      const index = links.findIndex((l) => l._key === key)
      if (index < 0) return
      onChange(
        PatchEvent.from(
          Object.entries(patch).map(([field, fieldValue]) =>
            set(fieldValue, [{_key: key}, field]),
          ),
        ),
      )
    },
    [links, onChange],
  )

  const addLinkAt = useCallback(
    (x: number, y: number) => {
      const label = window.prompt('Label for the new link (e.g. PROJECT)', `LINK ${nextNumber}`)
      if (!label) return
      const key = slugify(label) || `link-${nextNumber}`
      const item = {
        _type: 'navLink',
        _key: key,
        key,
        number: nextNumber,
        label: label.toUpperCase(),
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
        initiallyVisible: false,
        action: 'link',
        destinationType: 'external',
        openInNewTab: true,
      }
      onChange(PatchEvent.from([setIfMissing([]), insert([item], 'after', [-1])]))
      setSelectedKey(key)
    },
    [nextNumber, onChange],
  )

  const onBoardClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (dragRef.current) return
    if ((event.target as HTMLElement).closest('[data-link-marker]')) return
    const board = boardRef.current
    if (!board) return
    const rect = board.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    addLinkAt(Math.min(100, Math.max(0, x)), Math.min(100, Math.max(0, y)))
  }

  const onMarkerPointerDown = (key: string, event: React.PointerEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setSelectedKey(key)
    dragRef.current = {key}
    const board = boardRef.current
    if (!board) return

    const move = (ev: PointerEvent) => {
      const rect = board.getBoundingClientRect()
      const x = Math.min(100, Math.max(0, ((ev.clientX - rect.left) / rect.width) * 100))
      const y = Math.min(100, Math.max(0, ((ev.clientY - rect.top) / rect.height) * 100))
      patchLink(key, {
        x: Math.round(x * 10) / 10,
        y: Math.round(y * 10) / 10,
      })
    }

    const up = () => {
      dragRef.current = null
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }

    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
  }

  const removeSelected = () => {
    if (!selectedKey) return
    if (!window.confirm('Remove this link from the index?')) return
    onChange(PatchEvent.from(unset([{_key: selectedKey}])))
    setSelectedKey(null)
  }

  const selected = links.find((l) => l._key === selectedKey)

  return (
    <Stack space={4}>
      <Card padding={3} radius={2} shadow={1} tone="transparent">
        <Stack space={3}>
          <Text size={1} muted>
            Visual index map — drag numbers to move them. Click empty space to add a link.
          </Text>
          <div
            ref={boardRef}
            onClick={onBoardClick}
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 10',
              background: '#fff',
              border: '1px solid #d0d0d0',
              cursor: 'crosshair',
              userSelect: 'none',
              overflow: 'hidden',
            }}
          >
            {links.map((link) => {
              const {x, y} = coordsFor(link)
              const active = link._key === selectedKey
              return (
                <button
                  key={link._key}
                  type="button"
                  data-link-marker
                  onPointerDown={(e) => onMarkerPointerDown(link._key, e)}
                  title={`${link.number}. ${link.label || ''}`}
                  style={{
                    position: 'absolute',
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    border: active ? '2px solid #2276fc' : '1px solid transparent',
                    background: active ? '#e8f1ff' : 'transparent',
                    borderRadius: 4,
                    padding: '2px 6px',
                    fontFamily: 'Arial, Helvetica, sans-serif',
                    fontSize: 28,
                    lineHeight: 1,
                    cursor: 'grab',
                    color: '#000',
                  }}
                >
                  {link.number ?? '?'}
                </button>
              )
            })}
          </div>
          <Flex gap={2} align="center">
            <Button
              icon={AddIcon}
              text="Add link at center"
              mode="ghost"
              onClick={() => addLinkAt(50, 50)}
            />
            {selected && (
              <>
                <Text size={1}>
                  Selected: <strong>{selected.number}. {selected.label}</strong> ({coordsFor(selected).x.toFixed(1)}%,{' '}
                  {coordsFor(selected).y.toFixed(1)}%)
                </Text>
                <Button text="Remove" tone="critical" mode="ghost" onClick={removeSelected} />
              </>
            )}
          </Flex>
        </Stack>
      </Card>

      <Box>
        <Text size={1} weight="semibold" style={{marginBottom: 8}}>
          Link details
        </Text>
        {renderDefault(props)}
      </Box>
    </Stack>
  )
}

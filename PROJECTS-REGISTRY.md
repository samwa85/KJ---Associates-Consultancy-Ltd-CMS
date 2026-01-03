# 📋 Projects Registry

Track all projects deployed using this CMS template.

## Active Projects

| Project | Slug | Domain | API Port | Status |
|---------|------|--------|----------|--------|
| KJ & Associates | kj-associates | kjconsultancy.co.tz/demo | 3001 | ✅ Live |
| | | | | |
| | | | | |
| | | | | |

## Port Allocation

To avoid conflicts, use sequential ports for each project:

| Port | Project | Status |
|------|---------|--------|
| 3001 | KJ & Associates | ✅ Used |
| 3002 | Available | - |
| 3003 | Available | - |
| 3004 | Available | - |
| 3005 | Available | - |

## Supabase Instances (on Coolify)

| Instance Name | Project | Created |
|---------------|---------|---------|
| supabase-kj | KJ & Associates | Jan 2026 |
| | | |
| | | |

## Quick Reference

### Check All Running APIs
```bash
pm2 status
```

### View Logs for Specific Project
```bash
pm2 logs PROJECT-SLUG-api
```

### Restart Specific Project
```bash
pm2 restart PROJECT-SLUG-api
```

### Check Ports in Use
```bash
netstat -tlnp | grep LISTEN
```

---

## Adding a New Project

1. Create new repo from template
2. Run `./setup.sh`
3. Use next available port (3002, 3003, etc.)
4. Update this registry
5. Deploy!


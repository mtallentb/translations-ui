# OpenHands Integration Setup

This document explains how to set up @openhands mention handling in your GitHub repository.

## Current Setup

This repository includes GitHub Actions workflows that respond to @openhands mentions:

- `openhands-mention.yml` - Basic mention detection and responses
- `openhands-ai.yml` - Advanced AI integration (requires API keys)

## How It Works

When you mention @openhands in a PR comment or issue:

1. GitHub triggers the workflow on `issue_comment` events
2. The workflow checks if the comment contains "@openhands"
3. It extracts the command/request after the mention
4. Responds with appropriate information or actions

## Available Commands

- `@openhands review` - Request a code review
- `@openhands help` - Show available commands
- `@openhands status` - Check integration status

## Setup Options

### Option 1: Basic GitHub Actions (Current)

✅ **Already configured** - The workflows are ready to use.

**Features:**
- Automatic mention detection
- Basic command responses
- No external dependencies
- Works immediately

### Option 2: AI-Enhanced Responses

To enable AI-powered responses:

1. **Get OpenAI API Key:**
   ```bash
   # Visit https://platform.openai.com/api-keys
   # Create a new API key
   ```

2. **Add to Repository Secrets:**
   - Go to Settings → Secrets and variables → Actions
   - Add `OPENAI_API_KEY` with your API key

3. **Enable the AI workflow:**
   - The `openhands-ai.yml` workflow will automatically use AI when the key is available

### Option 3: External Webhook Service

For more advanced integration:

1. **Deploy a webhook service** (Node.js/Python/etc.)
2. **Configure GitHub webhook:**
   - Settings → Webhooks → Add webhook
   - Payload URL: Your service endpoint
   - Content type: application/json
   - Events: Issue comments, Pull request review comments

3. **Example webhook payload:**
   ```json
   {
     "action": "created",
     "comment": {
       "body": "@openhands review this PR",
       "user": { "login": "username" }
     },
     "repository": { "full_name": "owner/repo" }
   }
   ```

### Option 4: GitHub App

For enterprise-level integration:

1. **Create GitHub App:**
   - Settings → Developer settings → GitHub Apps
   - Configure permissions: Issues (read/write), Pull requests (read/write)
   - Subscribe to events: Issue comments, Pull request review comments

2. **Deploy app service** with proper authentication
3. **Install app** on repositories

## Testing

To test the current setup:

1. Create a comment in any PR or issue
2. Mention: `@openhands help`
3. The workflow should respond within 1-2 minutes

## Troubleshooting

**Workflow not triggering:**
- Check Actions tab for workflow runs
- Ensure the workflow files are in `.github/workflows/`
- Verify the mention format: `@openhands command`

**Permission errors:**
- Workflows use `GITHUB_TOKEN` automatically
- For external APIs, add secrets in repository settings

**Rate limits:**
- GitHub Actions have usage limits
- Consider caching for frequently accessed data

## Security Considerations

- Never commit API keys to the repository
- Use GitHub Secrets for sensitive data
- Validate all user inputs in workflows
- Consider rate limiting for mention responses

## Advanced Features

**Possible enhancements:**
- Code analysis and suggestions
- Automated testing triggers
- Integration with external tools
- Custom command parsing
- Multi-language support
- Persistent conversation context

## Support

For issues with the OpenHands integration:
1. Check the Actions tab for workflow logs
2. Review this documentation
3. Create an issue with the `openhands` label